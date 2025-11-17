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
    })
    if (!response.ok) {
      router.push('verify/error')
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
        await trigger(values)
        router.push('verify/success')
      } catch (error) {
        router.push('verify/error')
      }
    },
  })

  return { formik }
}
