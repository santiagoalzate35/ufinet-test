/* src/pages/CarsPage/CarForm.tsx */
import { useEffect } from 'react'
import * as api   from '@/api/cars'
import Button     from '@/components/Button/Button'
import { useForm } from '@/hooks/useForm'
import './form.css'

interface Props {
  initial?: api.Car
  onSubmit: (c: api.Car) => void
  onCancel: () => void
}

export default function CarForm({ initial, onSubmit, onCancel }: Props) {
  const { values, onChange, setValues } = useForm<api.Car>(
    initial ?? {
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      plate: '',
      color: ''
    }
  )

  useEffect(() => {
    if (initial) setValues(initial)
  }, [initial, setValues])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form className="car-form" onSubmit={submit}>
      {(['brand','model','year','plate','color'] as const).map(f => (
        <label key={f}>
          {f.toUpperCase()}
          <input
            name={f}
            value={values[f]}
            type={f === 'year' ? 'number' : 'text'}
            onChange={onChange}
            required
          />
        </label>
      ))}

      <div className="car-form__actions">
        <Button type="submit">
          {initial ? 'Actualizar' : 'Crear'}
        </Button>
        {/* aquí removemos variant y añadimos la clase */}
        <Button
          type="button"
          className="btn--secondary"
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </div>
    </form>
  )
}
