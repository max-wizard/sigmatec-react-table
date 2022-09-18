import renderer from 'react-test-renderer';
import Table from './Table';
import axios from 'axios';
import ModalImage from 'react-modal-image';
import React, { useMemo , useState } from 'react'

it('renders correctly', () => {

    const result = axios("http://jsonplaceholder.typicode.com/photos");

    const data = result.data;

    const columns = 
        [
            {
                Header: 'id',
                accessor: 'id'
            },
            {
                Header: 'Test',
                accessor: 'title',
            },
            {
                Header: 'thumbnail',
                accessor: 'thumbnailUrl',
                Cell: ({ cell: { value } }) => {
                return <ModalImage
                small={value}
                large={value}
                alt="Modal"
                />
                }
            },
        ];

    const tree = renderer
      .create(<Table columns={columns} data={data}></Table>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });