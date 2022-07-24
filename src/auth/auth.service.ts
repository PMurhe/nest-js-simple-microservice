import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Sign Up
   * @param authCredentialsDto
   * @returns void
   */
  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    // Hash & Store password

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({ username, password: hash });

    try {
      await this.usersRepository.save(user);
    } catch (e) {
      if (e.code == '23505') {
        throw new ConflictException(`Username already exists`);
      } else {
        throw new InternalServerErrorException(e.detail);
      }
    }
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOne({ where: { username } });
    const payload: JWTPayload = { username };
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
