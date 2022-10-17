import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";



@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id:       number;

    @Column('text')
    name:     string;

    @Column('text')
    username: string;

    @Column('text', {
        unique: true
    })
    email:    string;

    
    @Column("simple-json")
    address: {
        street:  string,
        suite:   string;
        city:    string;
        zipcode: string;
        geo:     {
            lat: string;
            lng: string;
        };
    };

     @Column('text')
    phone:    string;

     @Column('text')
    website:  string;

    @Column("simple-json")
    company: {
        name:        string;
        catchPhrase: string;
        bs:          string;
    };
}

