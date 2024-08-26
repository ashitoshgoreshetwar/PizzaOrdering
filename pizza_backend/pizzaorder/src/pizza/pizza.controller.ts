import {Body, Controller, Post,Get,Put, HttpStatus, Param, Delete, ParseIntPipe, UseInterceptors} from '@nestjs/common';
import { PizzaEntity } from './entities/pizza.entity';
import { PizzaService } from './pizza.service';
import { CreatePizzaDto } from './dto/create_pizza.dto';
import { UpdatePizzaDto } from './dto/update_pizza.dto';
import { ResponseInterceptor, SuccessMessage } from 'src/interceptors/response_interceptors';

@Controller('/pizzas') 
export class PizzaController
{
    constructor(private pizzaServ : PizzaService){}
    @Post()
    @SuccessMessage('Pizza added successfully')
    createPizza(@Body() createPizzaDto : CreatePizzaDto)
    {
        return this.pizzaServ.addPizza(createPizzaDto);
    }

    @Get()
    @SuccessMessage('Successfully fetched pizza details')
    getAllPizzas()
    {
        return this.pizzaServ.getAllPizza();
    }

    @Get(':id')
    @SuccessMessage('Data Found')
    getPizzaById(@Param('id',ParseIntPipe) pid : number)
    {
        return this.pizzaServ.getPizzaByID(pid);
    }
   
    @Put(':id')
    @SuccessMessage('Successfully updated pizza details')
    updatePizzaById(@Param('id',ParseIntPipe) pid : number , @Body() updatePizzaDto : UpdatePizzaDto)
    {
        return this.pizzaServ.updatePizzaByID(pid, updatePizzaDto);
    }

    @Delete(':id')
    deletePizzaById(@Param('id',ParseIntPipe) pid : number)
    {
        return this.pizzaServ.deletePizzaByID(pid);
    }
}