import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 50 })
  email: string;

  @Column('varchar', { length: 8 })
  celular: string;

  @Column('varchar', { length: 50 })
  direccion: string;
  @DeleteDateColumn({ name: 'fecha_eliminacion', select: false })
  deletedAt: Date;
}
