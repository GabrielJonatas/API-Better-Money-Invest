import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PayloadDto } from 'src/dto/jwt.dto';

export const JwtPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const payload = request.user; // ou onde quer que o payload esteja armazenado
    return plainToInstance(PayloadDto, payload, {
      excludeExtraneousValues: true,
    });
  },
);
