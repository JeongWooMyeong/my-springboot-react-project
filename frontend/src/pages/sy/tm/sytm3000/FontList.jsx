export default function FontList({
                                     fonts,
                                     onSelect,
                                     onDelete
                                 }){


    return (

        <div>


            <h3>
                등록 폰트
            </h3>


            <table
                border="1"
                width="100%"
            >

                <thead>

                <tr>

                    <th>
                        폰트명
                    </th>


                    <th>
                        파일명
                    </th>


                    <th>
                        Weight
                    </th>


                    <th>
                        Style
                    </th>


                    <th>
                        관리
                    </th>


                </tr>

                </thead>



                <tbody>


                {
                    fonts.map(font=>(

                        <tr
                            key={font.fontid}
                            onClick={()=>
                                onSelect(font)
                            }
                            style={{
                                cursor:"pointer"
                            }}
                        >

                            <td>
                                {font.fontfamily}
                            </td>


                            <td>
                                {font.fontfilename}
                            </td>


                            <td>
                                {font.fontweight}
                            </td>


                            <td>
                                {font.fontstyle}
                            </td>


                            <td>

                                <button
                                    onClick={(e)=>{

                                        e.stopPropagation();

                                        onDelete(
                                            font.fontid
                                        );

                                    }}
                                >
                                    삭제
                                </button>

                            </td>


                        </tr>

                    ))
                }


                </tbody>


            </table>


        </div>

    );

}