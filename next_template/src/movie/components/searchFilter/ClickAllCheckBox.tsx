import React from 'react';

import { changeFilter } from '@/redux/features/movieReducer';
import { useAppDispatch } from '@/redux/hook';

export default function onClickAllCheckBox(name : string, useFilter : boolean) {
    const dispatch = useAppDispatch();
    dispatch(changeFilter({name : name, useFilter : !useFilter}))
}