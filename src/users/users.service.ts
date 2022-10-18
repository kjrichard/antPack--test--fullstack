import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import  axios  from "axios";

import { User } from './entities/user.entity';


@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService')
  defaults: any;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

  ) {}


  async createAllUsers() {
    try {
      let userData = await this.userRepository.find({});
      if (userData.length) 
        return userData;
      const url = 'http://jsonplaceholder.typicode.com/users';
      await axios.get(url).then( async ( response ) => {
        response.data.forEach( async ( element ) => {
          
           let user: CreateUserDto = {
            id:       element.id,
            name:     element.name,
            username: element.username,
            email:    element.email,
            address:  {
              street:  element.address.street,
              suite:   element.address.suite,
              city:    element.address.city,
              zipcode: element.address.zipcode,
              geo:     {
                lat: element.address.geo.lat,
                lng: element.address.geo.lng
              }
            },
            phone:    element.phone,
            website:  element.website,
            company:  {
              name:        element.company.name,
              catchPhrase: element.company.catchPhrase,
              bs:          element.company.bs
            },

          };
          
          const newUser = this.userRepository.create( user );
          await this.userRepository.save( newUser );
          

        });
        return 'Usuarios registrados '; 
      })
      
    } catch (error) {
      this.handleExceptions(error);
      
    }
  } 

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    
    try {
      
      const user = this.userRepository.create( createUserDto );
      await this.userRepository.save( user );
      
      
      return user;
      
    } catch (error) {
      this.handleExceptions(error);
      
    }
  }

  async findAll() {
    try {
     
      const users = await this.userRepository.find({});
      return users;
    }catch (error) {
      console.log(error);
      this.handleExceptions(error);
      
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findBy({ id });
      if (!user.length ) 
        throw new BadRequestException(`User with id ${ id } no t found`)
      return user;
    }catch (error) {
      console.log(error);
      return this.handleExceptions(error);
      
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    });
  
     if( !user ) throw new NotFoundException(`User with id ${ id } not found`);

    try {
      await this.userRepository.save( user );
      return user;
    } catch (error) {
      this.handleExceptions( error );
    } 
  
  }

  async remove(id: number) {
    const user = await this.userRepository.findBy({ id });
    await this.userRepository.remove( user );
    return user
  }

  private handleExceptions( error: any ) {
    if (error.code === '23505') 
      throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

 


}
