import recordListModel from '@/modles/recordListModel';

export default {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),

};