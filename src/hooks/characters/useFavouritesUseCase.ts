import { useCallback } from 'react';

import { useCharacterContext } from '@/src/contexts/characters/CharacterProvider';
import { Character } from '@/src/modules/characters/domain/Character';

export const useFavouritesUseCase = () => {
  const {
    state: { favorites },
    dispatch,
  } = useCharacterContext();

  const markAsFavorite = useCallback(
    (character: Character) => {
      dispatch({
        type: 'setFavorites',
        payload: {
          favorites: [...favorites].concat(character),
        },
      });
    },
    [favorites]
  );

  const removeFromFavorites = useCallback(
    (character: Character) => {
      dispatch({
        type: 'setFavorites',
        payload: {
          favorites: [...favorites].filter(
            (favorite) => favorite.id !== character.id
          ),
        },
      });
    },
    [favorites]
  );

  const showOnlyFavorites = useCallback(() => {
    dispatch({
      type: 'setCharacters',
      payload: {
        characters: favorites,
      },
    });
  }, [favorites]);

  const handleFavorite = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      character?: Character
    ) => {
      e.preventDefault();
      e.stopPropagation();
      if (character) {
        if (
          !favorites.find((favorite: Character) => favorite.id === character.id)
        ) {
          markAsFavorite(character);
        } else {
          removeFromFavorites(character);
        }
      }
    },
    [favorites]
  );

  return {
    favorites,
    markAsFavorite,
    removeFromFavorites,
    showOnlyFavorites,
    handleFavorite,
  };
};
