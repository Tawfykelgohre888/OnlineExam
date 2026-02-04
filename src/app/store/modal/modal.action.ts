import { createAction, props } from '@ngrx/store';

export const openModal = createAction(
  '[modal] Open Modal ',
  props<{ examId: string }>()
);

export const closeModal = createAction('[modal] close Modal');

export const resetModal = createAction('[modal] reset modal');


export const showReport = createAction('[modal] show report');
