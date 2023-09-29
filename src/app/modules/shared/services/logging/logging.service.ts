import { LogLevel } from './log-level.model';
import { AppMode } from 'src/app/modules/common-core/models';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';

export abstract class LoggingService {
  abstract configureLogging(appMode: AppMode);
  abstract setUser(user: LoggedInUser);
  abstract error(error: Error, tag?: string, message?: string, optionalParams?: { [key: string]: any });
  abstract debug(message: string, tag?: string, optionalParams?: { [key: string]: any });
  abstract log(
    message?: string,
    error?: Error,
    level?: LogLevel,
    tag?: string,
    optionalParams?: { [key: string]: any }
  );
  abstract enable();
  abstract disable();
}
