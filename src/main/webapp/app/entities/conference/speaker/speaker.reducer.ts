import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { ISpeaker, defaultValue } from 'app/shared/model/conference/speaker.model';

export const ACTION_TYPES = {
  FETCH_SPEAKER_LIST: 'speaker/FETCH_SPEAKER_LIST',
  FETCH_SPEAKER: 'speaker/FETCH_SPEAKER',
  CREATE_SPEAKER: 'speaker/CREATE_SPEAKER',
  UPDATE_SPEAKER: 'speaker/UPDATE_SPEAKER',
  DELETE_SPEAKER: 'speaker/DELETE_SPEAKER',
  SET_BLOB: 'speaker/SET_BLOB',
  RESET: 'speaker/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISpeaker>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SpeakerState = Readonly<typeof initialState>;

// Reducer

export default (state: SpeakerState = initialState, action): SpeakerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SPEAKER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SPEAKER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SPEAKER):
    case REQUEST(ACTION_TYPES.UPDATE_SPEAKER):
    case REQUEST(ACTION_TYPES.DELETE_SPEAKER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SPEAKER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SPEAKER):
    case FAILURE(ACTION_TYPES.CREATE_SPEAKER):
    case FAILURE(ACTION_TYPES.UPDATE_SPEAKER):
    case FAILURE(ACTION_TYPES.DELETE_SPEAKER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SPEAKER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SPEAKER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SPEAKER):
    case SUCCESS(ACTION_TYPES.UPDATE_SPEAKER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SPEAKER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'conference/api/speakers';

// Actions

export const getEntities: ICrudGetAllAction<ISpeaker> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SPEAKER_LIST,
  payload: axios.get<ISpeaker>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISpeaker> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SPEAKER,
    payload: axios.get<ISpeaker>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISpeaker> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SPEAKER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISpeaker> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SPEAKER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISpeaker> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SPEAKER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
