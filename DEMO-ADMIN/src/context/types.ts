import {
  CardStatsSquareProps,
  CardStatsVerticalProps,
  CardStatsHorizontalProps,
  CardStatsWithAreaChartProps,
  CardStatsHorizontalWithDetailsProps
} from 'src/@core/components/card-statistics/types'

export type ErrCallbackType = (err: { [key: string]: string }) => void

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
}

export type UserDataType = {
  id: number
  role: string
  email: string
  fullName: string
  username: string
  password: string
  avatar?: string | null
}

export type AuthValuesType = {
  loading: boolean
  logout: () => void
  user: UserDataType | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataType | null) => void
  login: (params: LoginParams, errorCallback?: ErrCallbackType) => void
}

export type CardStatsType = {
  statsSquare: CardStatsSquareProps[]
  statsVertical: CardStatsVerticalProps[]
  statsHorizontal: CardStatsHorizontalProps[]
  statsWithAreaChart: CardStatsWithAreaChartProps[]
  statsHorizontalWithDetails: CardStatsHorizontalWithDetailsProps[]
}
