export interface ITablePropItem {
  prop?: string
  label?: string
  minWidth?: string
  slotName?: string
}

export interface ITable {
  title?: string
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  propList: ITablePropItem[]
}
