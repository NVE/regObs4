import { JsonResult } from '../../modules/regobs-api/models';
import { ArrayHelper } from './array-helper';

export class JsonResultHelper {
    static unwrap<T>(jsonResult: JsonResult, liftToArray = false): T {
        if (jsonResult && jsonResult.Data) {
            if (typeof (jsonResult.Data) === 'string') {
                return JSON.parse(jsonResult.Data as string) as T;
            } else {
                return jsonResult.Data as T;
            }
        } else {
            return null;
        }
    }

    static unwrapToArray<T>(jsonResult: JsonResult): T[] {
        const result = JsonResultHelper.unwrap<T>(jsonResult);
        return ArrayHelper.liftToArray(result);
    }
}
