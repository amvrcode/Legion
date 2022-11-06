import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { catchError, map, Observable, throwError } from 'rxjs'

@Injectable()
export class ResponceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((body) => {
        const respone = context.switchToHttp().getResponse()
        return {
          data: body,
          statusCode: respone.statusCode,
        }
      })
    )
  }
}
