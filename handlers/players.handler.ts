import { NepHandler } from '../neprest/NepHandler';
import { NepEndpoint } from '../neprest/NepEndpoint';
import { NepDeleteRequest, NepGetRequest, NepPostRequest } from '../neprest/NepRequest';

export class Player {
  id: number;
  tag: string;
  rank: number;
  tier: number;

  constructor(input: Partial<Player>) {
    Object.assign(this, input);
  }
  
}

@NepHandler({
  table: 'players',
  schema: Player,
})
export class PlayersHandler {
  
  @NepEndpoint({
    method: 'get',
    queryParams: ['tag']
  })
  getPlayers(params, queryParams): NepGetRequest<Player[]> {
    return new NepGetRequest<Player[]>({
      select: '*',
      where: queryParams.tag ? 'tag LIKE ' + queryParams.tag : null,
    });
  }
  
  @NepEndpoint({
    method: 'post',
  })
  addPlayer(params, body): NepPostRequest<Player> {
    return new NepPostRequest<Player>({
      insert: new Player(body.player),
    });
  }
  
  
  @NepEndpoint({
    method: 'get',
    params: ['id']
  })
  getPlayerById(params, queryParams): NepGetRequest<Player> {
    return new NepGetRequest({
      select: '*',
      where: 'id=' + params.id,
      prep: (response: Player[]): Player => {
        if (Array.isArray(response)) {
          return response[0];
        } else {
          return null;
        }
      }
    })
  }
  
  @NepEndpoint({
    method: 'delete',
    params: ['id']
  })
  deletePlayer(params): NepDeleteRequest<Player> {
    return new NepDeleteRequest<Player>({
      where: 'id=' + params.id,
    });
  }
  
}