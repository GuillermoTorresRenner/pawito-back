import { UsersRepository } from "../repositories/users.repository";
import { UsersCreateDTO,UsersWhoamiDTO } from "../../types/users.dto";
 import { hashPassword } from "../utils/passwords";
export class UserService {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async createUser(user: UsersCreateDTO) {
      user.password = hashPassword(user.password);
      return await this.usersRepository.create(user);
    
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async getRoleByID(userID:string){
        return await this.usersRepository.findRoleByID(userID);

  }

  async getUserById(userID: string) {
    const user= await this.usersRepository.findById(userID);
    const userDTO:UsersWhoamiDTO={
      name:user?.name || "",
      surname:user?.surname || "",
      email:user?.email ||""
  };
  return userDTO;
  
}

async updateLastConnection(userID: string) {
  return await this.usersRepository.updateLastConnection(userID);
}

 async findOrCreateGoogleUser(profile: any) {
  console.log(profile)
    let user = await this.usersRepository.findByEmail(profile.emails[0].value);
    if (!user) {
      user = await this.usersRepository.create({
        name: profile.name.givenName,
        surname: profile.name.familyName,
        email: profile.emails[0].value,
        password: "",
        avatar: profile.photos[0].value,
      });
    }
    return user;
  }

}