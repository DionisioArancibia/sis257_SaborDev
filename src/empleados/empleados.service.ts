import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Empleado)
    private empleadosRepository: Repository<Empleado>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const existe = await this.empleadosRepository.findOneBy({
      nombre: createEmpleadoDto.nombre.trim(),
      cargo: createEmpleadoDto.cargo.trim(),
      celular: createEmpleadoDto.celular.trim(),
    });

    if (existe) {
      throw new ConflictException('El empleado ya existe');
    }

    const empleado = new Empleado();
    empleado.nombre = createEmpleadoDto.nombre.trim();
    empleado.cargo = createEmpleadoDto.cargo.trim();
    empleado.celular = createEmpleadoDto.celular.trim();
    empleado.fechaContratacion = createEmpleadoDto.fechaContratacion;

    return this.empleadosRepository.save(empleado);
  }

  async findAll(): Promise<Empleado[]> {
    return this.empleadosRepository.find();
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadosRepository.findOneBy({ id });

    if (!empleado) {
      throw new NotFoundException('El empleado no existe');
    }

    return empleado;
  }

  async update(
    id: number,
    updateEmpleadoDto: UpdateEmpleadoDto,
  ): Promise<Empleado> {
    const empleado = await this.findOne(id);

    // Actualiza los campos del empleado si son proporcionados
    empleado.nombre = updateEmpleadoDto.nombre?.trim() || empleado.nombre;
    empleado.cargo = updateEmpleadoDto.cargo?.trim() || empleado.cargo;
    empleado.celular = updateEmpleadoDto.celular?.trim() || empleado.celular;

    return this.empleadosRepository.save(empleado);
  }

  async remove(id: number): Promise<Empleado> {
    const empleado = await this.findOne(id);
    return this.empleadosRepository.softRemove(empleado);
  }
}
