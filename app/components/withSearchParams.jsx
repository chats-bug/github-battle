import * as React from 'react';
import { render } from 'react-dom';
import * as ReactDOM from 'react-dom/client';
import { useSearchParams } from 'react-router-dom';

export default function withSearchParams(Component) {
	return function ComponentWithSearchParams(props) {
		const [ searchParams ] = useSearchParams();

		return <Component {...props} router={{ searchParams }}/>
	}
}