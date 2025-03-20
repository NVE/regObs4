import { LogLevel } from './log-level.model';
import { AppMode } from '../../../common-core/models';
import { LoggedInUser } from '../../../login/models/logged-in-user.model';

export abstract class LoggingService {
  abstract configureLogging(appMode: AppMode): void;
  abstract setUser(user: LoggedInUser): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract error(error: unknown, tag?: string, message?: string, optionalParams?: { [key: string]: any }): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract debug(message: string, tag?: string, optionalParams?: { [key: string]: any }): void;
  abstract log(
    message?: string,
    error?: unknown,
    level?: LogLevel,
    tag?: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    optionalParams?: { [key: string]: any }
  ): void;
  abstract enable(): void;
  abstract disable(): void;
}
