'use client'

import { useFormik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import useSWRMutation from 'swr/mutation'
import { useCsrfToken } from './csrf-token'
import * as yup from 'yup'

interface UseVerify {
  formik: FormikProps<FormValues>
}

interface FormValues {
  token: string
  csrfToken: string
}

export function useVerify(): UseVerify {
  const router = useRouter()
  const { data } = useCsrfToken()
  const verify = async (url: string, { arg }: { arg: FormValues }) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': arg.csrfToken,
      },
      body: JSON.stringify({ token: arg.token }),
    })

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: 'Request failed' }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  const { trigger } = useSWRMutation('/api/verify', verify)

  const formik = useFormik<FormValues>({
    initialValues: {
      token: '',
      csrfToken: data?.token || '',
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      token: yup.string().required(),
      csrfToken: yup.string().required(),
    }),
    onSubmit: async values => {
      try {
        console.log('Submitting values:', values)
        await trigger(values)
        router.push('/success')
      } catch (error) {
        console.error('Verify error:', error)
        router.push('/error')
      }
    },
  })

  return { formik }
}
