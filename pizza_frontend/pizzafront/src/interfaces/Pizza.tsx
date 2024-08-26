export interface Pizza {
    PizzaId: number;
    Name: string;
    Description: string;
    ImageUrl: string;
    RegularSizePrice: number;
    MediumSizePrice: number;
    LargeSizePrice: number;
    [key: string]: any; 
    Type: 'Veg' | 'NonVeg'; 
  }
  