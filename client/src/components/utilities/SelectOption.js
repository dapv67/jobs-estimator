import React from 'react'

export const SelectOption = ({
    onChange,
    data,
    value,
    name,
    mapValueFrom = "value",
    mapTextFrom = "text",
    placeholder = "No hay datos",
    defaultValue = "Default",
    isLoading = false,
    style = "",
    classColor = ""
}) => (
    <div className="control is-expanded">
        <div className={`select is-fullwidth ${classColor} ${isLoading ? 'is-loading' : ''}`}>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={style + " " + classColor}
            //disabled={`${isLoading ? 'true' : 'false'}`}
            >
                <option value="" defaultValue>{defaultValue}</option>
                {
                    data !== null ? (
                        Object.values(data).map((item) => {
                            return (<option
                                key={item[`${mapValueFrom}`]}
                                value={item[`${mapValueFrom}`]}
                            > {item[`${mapTextFrom}`]}
                            </option>)
                        })
                    ) : (
                        <option value=''>{placeholder}</option>
                    )
                }
            </select>
        </div>
    </div>
) 