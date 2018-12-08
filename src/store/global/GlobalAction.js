export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';

export function updateCurrentPage(current){
  return {
    type:UPDATE_CURRENT_PAGE,
    payload:current
  }
}