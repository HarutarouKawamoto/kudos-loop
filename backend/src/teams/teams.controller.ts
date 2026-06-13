import { Controller, Post, Body, UseGuards, Request} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamService: TeamsService){}
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createTeamDto: { name: string },@Request() req){
        return this.teamService.createTeam(createTeamDto.name,req.user.userId);

    } 

    @Post('join')
    @UseGuards(AuthGuard('jwt'))
    async join(@Body() joinTeamDto: { inviteCode: string },@Request() req){
        return this.teamService.joinTeam(joinTeamDto.inviteCode,req.user.userId);
    }
}