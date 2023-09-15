import React from 'react';

import {TableCell} from "../../components/tableCell/TableCell";
import "./AllPages.css";

const AllPages = ({allPagesData}) => {

    return (
        <div className="all-pages-box">
            <table>
                <thead>
                <tr>
                    <th>Page name</th>
                    <th>View page</th>
                    <th>Source page</th>
                </tr>
                </thead>
                <tbody>
                {allPagesData?.map((page, index) => {

                        const pageValue = page.page;
                        return (
                            <React.Fragment key={index}>
                                <TableCell link={page.page} namePage={pageValue}/>
                            </React.Fragment>
                        );
                    }
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AllPages;
