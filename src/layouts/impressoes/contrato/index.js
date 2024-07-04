/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React from 'react';
import ReactDOM from 'react-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#FFFFFF',
      padding: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    header: {
      fontSize: 14,
      marginBottom: 10,
      textDecoration: 'underline',
      textAlign: 'center',
    },
    text: {
      fontSize: 10,
      marginBottom: 5,
    },
    textCentered: {
        fontSize: 10,
        marginBottom: 5,
        textAlign: 'center',
    },
    signature: {
      marginTop: 40,
      width: '50%',
      textAlign: 'center',
      borderBottom: 1,
    },
  });
  
  const MyDocument = ({ item }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS</Text>
          <Text style={styles.text}>Pelo presente instrumento particular de Contrato de Prestação de Serviços Educacionais, de um lado:</Text>
          <Text style={styles.text}>CONTRATADA:</Text>
          <Text style={styles.text}>Nome: Instituto Lóttus, portadora do CNPJ: 123.123.123/00001, endereço: Rua do instituto lóttus, 123 e telefone: 34123-1232</Text>
          <Text style={styles.text}>E, de outro lado, CONTRATANTE:</Text>
          <Text style={styles.textCentered}>Nome: {item.pessoa.nome}</Text>
          <Text style={styles.textCentered}>CPF: {item.pessoa.documento[0].nro_documento}</Text>
          <Text style={styles.textCentered}>Endereço: {item.pessoa.endereco.logradouro}</Text>
          <Text style={styles.textCentered}>Telefone: {item.pessoa.contato[0].descricao}</Text>
          <Text style={styles.text}>Têm entre si justo e contratado o seguinte:</Text>
          <Text style={styles.text}>CLÁUSULA 1 - OBJETO</Text>
          <Text style={styles.text}>O presente contrato tem por objeto a prestação de serviços educacionais pela CONTRATADA ao aluno {item.pessoa.nome}, no curso de aprendizagem, durante o período letivo do ano 2024.</Text>
          <Text style={styles.text}>CLÁUSULA 2 - DURAÇÃO</Text>
          <Text style={styles.text}>O presente contrato terá início em hoje e término em um dia, podendo ser renovado mediante acordo entre as partes.</Text>
          <Text style={styles.text}>CLÁUSULA 3 - MENSALIDADES</Text>
          <Text style={styles.text}>3.1. O CONTRATANTE pagará à CONTRATADA a quantia mensal de R$ 150.000, até o dia 1 de cada mês.</Text>
          <Text style={styles.text}>3.2. Em caso de atraso no pagamento, incidirá uma multa de 500% sobre o valor da mensalidade, além de juros de 852% ao mês.</Text>
          <Text style={styles.text}>CLÁUSULA 4 - OBRIGAÇÕES DA CONTRATADA</Text>
          <Text style={styles.text}>4.1. Prestar serviços educacionais de qualidade, conforme o currículo e horários estabelecidos.</Text>
          <Text style={styles.text}>4.2. Fornecer material didático necessário para o desenvolvimento das atividades escolares, exceto aqueles indicados na lista de materiais a serem adquiridos pelo CONTRATANTE.</Text>
          <Text style={styles.text}>4.3. Assegurar um ambiente seguro e adequado para o ensino.</Text>
          <Text style={styles.text}>CLÁUSULA 5 - OBRIGAÇÕES DO CONTRATANTE</Text>
          <Text style={styles.text}>5.1. Efetuar o pagamento das mensalidades pontualmente.</Text>
          <Text style={styles.text}>5.2. Zelar pela conservação dos materiais e instalações da escola.</Text>
          <Text style={styles.text}>5.3. Cumprir e fazer com que o. aluno cumpra as normas e regulamentos internos da escola.</Text>
          <Text style={styles.text}>CLÁUSULA 6 - RESCISÃO</Text>
          <Text style={styles.text}>6.1. O presente contrato poderá ser rescindido por qualquer das partes, mediante aviso prévio por escrito de 0 dias.</Text>
          <Text style={styles.text}>6.2. Em caso de rescisão por parte do CONTRATANTE, este deverá quitar todas as mensalidades vencidas até a data da rescisão.</Text>
          <Text style={styles.text}>CLÁUSULA 7 - DISPOSIÇÕES GERAIS</Text>
          <Text style={styles.text}>7.1. O não exercício por qualquer das partes de quaisquer direitos ou faculdades que lhes assistam por força deste contrato, ou a sua tolerância com a inobservância de quaisquer obrigações assumidas pela outra parte, não significará renúncia a tais direitos ou faculdades, nem a alteração das condições estipuladas neste contrato.</Text>
          <Text style={styles.text}>7.2. Este contrato obriga as partes e seus sucessores, a qualquer título, sendo vedada sua cessão ou transferência sem o consentimento prévio e por escrito da outra parte.</Text>
          <Text style={styles.text}>E, por estarem assim justas e contratadas, assinam o presente contrato em duas vias de igual teor, na presença das testemunhas abaixo.</Text>
          <Text style={styles.text}>Marília, Junho de 2024</Text>
          <Text style={styles.textCentered}>_____________________________________</Text>
          <Text style={styles.textCentered}>Sandra de F. C. R.</Text>
          <Text style={styles.textCentered}>CONTRATADA</Text>
          <Text style={styles.textCentered}>_____________________________________</Text>
          <Text style={styles.textCentered}>Pai do Aluno</Text>
          <Text style={styles.textCentered}>CONTRATANTE</Text>
        </View>
      </Page>
    </Document>
  );

const GeneratePDF = ({item}) => (
  <div>
    <PDFDownloadLink document={<MyDocument item={item} />} fileName="contrato.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Baixar em PDF'
      }
    </PDFDownloadLink>
  </div>
);

export default GeneratePDF;
