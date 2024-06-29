import { DataTable } from "react-native-paper";

export function SimpleTable(props: { heading: string[]; data: string[][] }) {
  const { heading, data } = props;
  return (
    <DataTable>
      <DataTable.Header>
        {heading.map((text, index) => (
          <DataTable.Title numeric={index === heading.length - 1} key={text}>
            {text}
          </DataTable.Title>
        ))}
      </DataTable.Header>
      {data.map((sub_data, index) => (
        <DataTable.Row key={index}>
          {sub_data.map((text, sub_index) => (
            <DataTable.Cell numeric={sub_index === sub_data.length - 1}>{text}</DataTable.Cell>
          ))}
        </DataTable.Row>
      ))}
    </DataTable>
  );
}
