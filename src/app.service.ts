import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entitys/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(createUser: { nombre: string; edad: number }) {
    const user = this.userRepository.create(createUser);
    return this.userRepository.save(user)+`usuario  con ID ${user.id} creado exitosamente`
    ;

  }

  async update(id: number, updateUser: { nombre?: string; edad?: number }) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    await this.userRepository.update(id, updateUser);
    return this.findOne(id)+ `usuario  con ID ${user.id} actualizado exitosamente`;
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return { message: 'Usuario eliminado exitosamente', affected: result.affected };
  }
  
}
