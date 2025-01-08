import { LogLevel } from './log-level.model';
import { AppMode } from '../../../common-core/models';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';

export abstract class LoggingService {
  abstract configureLogging(appMode: AppMode): void;
  abstract setUser(user: LoggedInUser): void;
  abstract error(error: unknown, tag?: string, message?: string, optionalParams?: { [key: string]: any }): void;
  abstract debug(message: string, tag?: string, optionalParams?: { [key: string]: any }): void;
  abstract log(
    message?: string,
    error?: unknown,
    level?: LogLevel,
    tag?: string,
    optionalParams?: { [key: string]: any }
  ): void;
  abstract enable(): void;
  abstract disable(): void;
}
