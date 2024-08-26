import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm';

@Entity("Pizza")
export class PizzaEntity
{
    @PrimaryGeneratedColumn()
    PizzaId : number;

    @Column({unique : true})
    Name : string;

    @Column(
        {
            type : "enum",  
            enum : ["Veg","NonVeg"],
        }
    )
    Type : string;

    @Column()
    ImageUrl : string;

    @Column({type : "text"})
    Description : string;

    @Column()
    RegularSizePrice : number;

    @Column()
    MediumSizePrice : number;
    
    @Column()
    LargeSizePrice : number;
  mediumPrice: any;
  largePrice: any;
   

}

