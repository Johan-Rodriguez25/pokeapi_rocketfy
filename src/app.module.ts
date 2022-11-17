import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {AuthModule} from './auth/auth.module'
import {DatabaseModule} from './database/database.module'
import {PokemonsModule} from './pokemons/pokemons.module'
import {UsersModule} from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PokemonsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
