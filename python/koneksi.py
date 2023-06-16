from pyndn import Name, Data, Face
from pyndn.security import KeyChain

# Membuat objek Face
face = Face()

# Membuat objek KeyChain
keychain = KeyChain()

# Fungsi untuk menangani permintaan Interest
def onData(interest, face, prefix, keychain, certificateName):
    # Membuat objek Data dengan nama yang sama dengan Interest
    data = Data(interest.getName())
    
    # Mengatur konten data
    content = "Hello, World!"
    data.setContent(content.encode())
    
    # Mengisi Signature pada data menggunakan kunci pribadi
    keychain.sign(data, certificateName)
    
    # Mengirimkan data ke Face
    face.putData(data)

# Membuat prefix untuk producer
prefix = Name('/example')

# Mengambil kunci pribadi dari KeyChain
privateKey = keychain.getDefaultCertificate().getDefaultKey().getPrivateKey()

# Mengambil nama sertifikat
certificateName = keychain.getDefaultCertificateName()

# Menambahkan prefix dan menentukan fungsi penanganan permintaan Interest
face.setInterestFilter(prefix, onData, face, prefix, keychain, certificateName)

# Memulai proses peristiwa pada Face
face.processEvents()