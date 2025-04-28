// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { validateRequest } from './utils/validateRequest';
// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request: any = context.switchToHttp().getRequest();
//     // validate the jwt header
//     const isValid = validateRequest(request);
//     if (!isValid) {
//       return false;
//     }
//     // validate the user
//     const user = request.user;
//     if (!user) {
//       return false;
//     }
//   }
// }
