import { AppDispatch, RootState } from '@/state/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';


// Typed versions of hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;