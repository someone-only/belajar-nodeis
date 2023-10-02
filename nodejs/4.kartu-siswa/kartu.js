const y = require('yargs')
const { simpanDataSiswa, listDataSiswa, detailDataSiswa, deleteDataSiswa } = require('./kartuSiswa')

const main = () => {
  y.command({
    command: 'add',
    describe: 'Menambahkan data siswa',
    builder: {
      id: {
        describe: 'Id Siswa',
        demandOption: true,
        type: 'string'
      },
      nama: {
        describe: 'Nama Lengkap Siswa',
        demandOption: true,
        type: 'string'
      },
      kelas: {
        describe: 'Kelas Siswa',
        demandOption: true,
        type: 'string'
      }
    },
    handler (argv) {
      simpanDataSiswa(argv.id, argv.nama, argv.kelas)
    }
  }).demandCommand()

  y.command({
    command: 'list',
    describe: 'Melihat daftar data siswa',
    handler () {
      listDataSiswa()
    }
  })

  y.command({
    command: 'detail',
    describe: 'Melihat detail dari siswa',
    builder: {
      nama: {
        describe: 'Nama siswa',
        demandOption: true,
        type: 'string'
      }
    },
    handler (argv) {
      detailDataSiswa(argv.nama)
    }
  })

  y.command({
    command: 'delete',
    describe: 'Menghapus data siswa berdasarkan nama atau id',
    builder: {
      nama: {
        describe: 'Nama siswa',
        demandOption: false,
        type: 'string'
      },
      id: {
        describe: 'Id siswa',
        demandOption: false,
        type: 'string'
      }
    },
    handler (argv) {
      deleteDataSiswa(argv.id, argv.nama)
    }
  }).demandCommand()

  y.parse()
}

module.exports = { main }
