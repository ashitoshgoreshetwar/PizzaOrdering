import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PizzaEntity } from './entities/pizza.entity';
import { CreatePizzaDto } from './dto/create_pizza.dto';
import { UpdatePizzaDto } from './dto/update_pizza.dto';
 
@Injectable()
export class PizzaService {
  constructor(@InjectRepository(PizzaEntity) private pizzaRepository: Repository<PizzaEntity>) {}

  async addPizza(createPizzaDto: CreatePizzaDto): Promise<PizzaEntity> 
  {
    const pizzadata = this.pizzaRepository.create(createPizzaDto);
    return await this.pizzaRepository.save(pizzadata);
  }

  async getAllPizza(): Promise<PizzaEntity[]> {
    return await this.pizzaRepository.find();
  }

  async getPizzaByID(pid: number): Promise<PizzaEntity> {
    const pizza = await this.pizzaRepository.findOneBy({ PizzaId: pid });
    if (!pizza) {
      throw new NotFoundException(`Pizza with ID ${pid} not found`);
    }
    return pizza;
  }

  async updatePizzaByID(pid: number, updatePizzaDto: UpdatePizzaDto): Promise<PizzaEntity> {
    const pdata = await this.pizzaRepository.findOneBy({ PizzaId: pid });
    if(!pdata)
    {
      throw new NotFoundException(`Pizza with ID ${pid} not found`);
    }
    else
    {
      await this.pizzaRepository.update(pid, updatePizzaDto);
      return this.pizzaRepository.findOneBy({ PizzaId: pid });
    }
    
  }

  async deletePizzaByID(pid: number) {
    return await this.pizzaRepository.delete(pid);
  }
}
