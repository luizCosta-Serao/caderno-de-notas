import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { ChangeEvent } from 'react'
import styles from './RadioButton.module.css'

type RadioButtonProps = {
  selectedValue: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const RadioButton = ({
  selectedValue,
  handleChange
}: RadioButtonProps ) => {

  return (
    <section className={styles.radioOptions}>
      <div>
        <Radio
          checked={selectedValue === 'all'}
          onChange={handleChange}
          value="all"
        />
        <label htmlFor="filter">Todos</label>
      </div>

      <div>
        <Radio
          checked={selectedValue === 'true'}
          onChange={handleChange}
          value="true"
        />
        <label htmlFor="filter">Prioridades</label>
      </div>

      <div>
        <Radio
          checked={selectedValue === 'false'}
          onChange={handleChange}
          value="false"
        />
        <label htmlFor="filter">Normal</label>
      </div>
    </section>
  )
}

export default RadioButton