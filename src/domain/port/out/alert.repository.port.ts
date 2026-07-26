import { AlertEntity } from '../../entities/alert.entity';
import { TheftReportEntity } from '../../entities/theft-report.entity';

export interface AlertRepositoryPort {
  saveAlert(alert: AlertEntity): Promise<AlertEntity>;
  listAlerts(): Promise<AlertEntity[]>;
  saveTheftReport(report: TheftReportEntity): Promise<TheftReportEntity>;
  listTheftReports(): Promise<TheftReportEntity[]>;
}
export const ALERT_REPOSITORY = Symbol('AlertRepositoryPort');
