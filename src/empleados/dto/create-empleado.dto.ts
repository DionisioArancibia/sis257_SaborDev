import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
export class CreateEmpleadoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombre no debe ser mayor a 50 caracteres',
  })
  readonly nombre: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo cargo es obligatorio' })
  @IsString({ message: 'El campo cargo debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo cargo no debe ser mayor a 50 caracteres',
  })
  readonly cargo: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'El campo celular es obligatorio' })
  @IsString({ message: 'El campo celular debe ser de tipo cadena' })
  @MaxLength(8, {
    message: 'El campo celular no debe ser mayor a 50 caracteres',
  })
  readonly celular: string;
  @ApiProperty()
  @IsDefined({ message: 'El campo fechaContratacion debe estar definido' })
  @IsDateString(
    {},
    { message: 'El campo fechaContratacion debe ser de tipo fecha' },
  )
  readonly fechaContratacion: Date;
}
