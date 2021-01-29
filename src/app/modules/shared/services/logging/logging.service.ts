import { LogLevel } from './log-level.model';
import { AppMode } from '../../../../core/models/app-mode.enum';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';

export abstract class LoggingService {
  abstract configureLogging(appMode: AppMode);
  abstract setUser(user: LoggedInUser);
  abstract error(
    error: Error,
    tag?: string,
    message?: string,
    ...optionalParams: any[]
  );
  abstract debug(message: string, tag?: string, ...optionalParams: any[]);
  abstract log(
    message?: string,
    error?: Error,
    level?: LogLevel,
    tag?: string,
    ...optionalParams: any[]
  );
  abstract enable();
  abstract disable();
}
