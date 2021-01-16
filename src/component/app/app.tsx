import React from 'react';

import { AppContext } from '../../shared/context-provider/context.provider';
import BoardWrapper from '../board-wrapper/board-wrapper.component';
import MainMenu from '../main-menu/main-menu.component';
import IconChoose from '../icon-choose/icon-choose.component';
import { GAME_TYPES } from '../../shared/utils/utils';

function App(props: any) {
  return (
    <AppContext.Consumer>
      {(context: any) => {
        return (
          <>
            {
              context.isMainMenu ? 
                <MainMenu /> : 
                  context.gameType === GAME_TYPES.VERSUS_COMPUTER && !context.isIconSelected ? 
                    <IconChoose />
                  : <BoardWrapper />
            }
          </>
        )
      }}
    </AppContext.Consumer>
  );
}

export default App;
