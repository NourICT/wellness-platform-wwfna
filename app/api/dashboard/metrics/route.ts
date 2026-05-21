// app/api/dashboard/metrics/route.ts - Dashboard analytics endpoint

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { subDays } from 'date-fns';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const department = searchParams.get('department');
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = subDays(new Date(), days);

    // Get overall wellness metrics
    const checkIns = await prisma.checkIn.findMany({
      where: {
        createdAt: {
          gte: startDate,
        },
      },
      include: {
        employee: true,
      },
    });

    // Filter by department if specified
    const filteredCheckIns = department
      ? checkIns.filter((c) => c.employee.department === department)
      : checkIns;

    // Calculate aggregate metrics
    const totalEmployees = new Set(
      filteredCheckIns.map((c) => c.employee.id)
    ).size;
    const participationRate =
      totalEmployees > 0 ? (filteredCheckIns.length / totalEmployees / 4) * 100 : 0; // 4 weeks

    // Risk distribution
    const riskDistribution = {
      healthy: filteredCheckIns.filter((c) => c.riskLevel === 'healthy').length,
      watch: filteredCheckIns.filter((c) => c.riskLevel === 'watch').length,
      highRisk: filteredCheckIns.filter(
        (c) => c.riskLevel === 'high_risk'
      ).length,
      critical: filteredCheckIns.filter(
        (c) => c.riskLevel === 'critical'
      ).length,
    };

    // Get department metrics
    const departmentMetrics = await prisma.departmentMetrics.findMany({
      where: department ? { department } : undefined,
    });

    // Calculate overall wellness score
    const avgBurnout =
      filteredCheckIns.length > 0
        ? filteredCheckIns.reduce((sum, c) => sum + c.burnoutScore, 0) /
          filteredCheckIns.length
        : 0;

    const overallWellnessScore = Math.round(100 - avgBurnout);

    // Get critical alerts (high risk or critical cases)
    const criticalAlerts = await prisma.checkIn.findMany({
      where: {
        employee: department ? { department } : undefined,
        riskLevel: { in: ['high_risk', 'critical'] },
        createdAt: { gte: startDate },
      },
      include: { employee: true },
      orderBy: { burnoutScore: 'desc' },
      take: 10,
    });

    // Get weekly trends
    const weeklyData = await prisma.checkIn.groupBy({
      by: ['week', 'year', 'riskLevel'],
      where: {
        employee: department ? { department } : undefined,
        createdAt: { gte: startDate },
      },
      _count: true,
      _avg: {
        burnoutScore: true,
      },
    });

    return NextResponse.json({
      overallWellnessScore,
      totalEmployees,
      participationRate: Math.round(participationRate),
      departmentMetrics,
      criticalAlerts: criticalAlerts.map((c) => ({
        id: c.id,
        employeeId: c.employeeId,
        employeeName: c.employee.name,
        department: c.employee.department,
        burnoutScore: c.burnoutScore,
        riskLevel: c.riskLevel,
        createdAt: c.createdAt,
      })),
      weeklyTrend: weeklyData,
      riskDistribution,
    });
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard metrics' },
      { status: 500 }
    );
  }
}
