import {  ArrayNotEmpty,
    IsArray,
    IsInt,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    ValidateNested,
    Min,
    Max,
    IsNumber,
    IsEmail,
    IsOptional
} from 'class-validator';

import { Type } from 'class-transformer';

export class Geo {
    @IsString()
    @IsNotEmpty()
    lat: string;

    @IsString()
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
    @MaxLength(15)
    name:        string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    catchPhrase: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    bs:          string;
}

export class CreateUserDto {
    @IsOptional()
    id:       number;

    @IsString()
    @IsNotEmpty()
    @Matches('^[a-zA-Z\\s]+$')
    @MaxLength(50)
    name:     string;

    @IsString()
    @IsNotEmpty()
    @Matches('^[a-zA-Z\\s]+$')
    @MaxLength(15)
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
    @MaxLength(50)
    phone:    string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    website:  string;

    @ValidateNested()
    @Type(() => Company)
    @IsNotEmpty()
    company:  Company;
}



