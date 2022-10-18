import {  
    IsNotEmpty,
    IsString,
    MaxLength,
    ValidateNested,
    IsEmail,
    IsOptional
} from 'class-validator';

import { Type } from 'class-transformer';

export class Geo {
    @IsNotEmpty()
    lat: string;

    @IsNotEmpty()
    lng: string;
}



export class Address {

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    street:  string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    suite:   string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    city:    string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(15)
    zipcode: string;
    
    @ValidateNested()
    @Type(() => Geo)
    @IsNotEmpty()
    geo: Geo;

   
}



export class Company {

    @IsString()
    @IsNotEmpty()
    name:        string;

    @IsString()
    @IsNotEmpty()
    catchPhrase: string;

    @IsString()
    @IsNotEmpty()
    bs:          string;
}

export class CreateUserDto {
    @IsOptional()
    id:       number;

    @IsString()
    @IsNotEmpty()
    name:     string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsEmail()
    email:    string;


    @ValidateNested()
    @Type(() => Address)
    @IsNotEmpty()
    address: Address;

    @IsString()
    @IsNotEmpty()
    phone:    string;

    @IsString()
    @IsNotEmpty()
    website:  string;

    @ValidateNested()
    @Type(() => Company)
    @IsNotEmpty()
    company:  Company;
}



