package pl.edu.agh.server.group;

import lombok.SneakyThrows;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;
import pl.edu.agh.server.student.StudentDTO;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.List;

@Service
public class GroupService {
//    @SneakyThrows
    public void exportToExcel(List<GroupDTO> groupDTOS, HttpServletResponse response) throws Exception{
        
        HSSFWorkbook workbook = new HSSFWorkbook();

        for (GroupDTO group: groupDTOS) {
            HSSFSheet sheet = workbook.createSheet(group.getTerm().toString());
            HSSFRow firstRow = sheet.createRow(0);

            firstRow.createCell(0).setCellValue("Imię");
            firstRow.createCell(1).setCellValue("Nazwisko");
            firstRow.createCell(2).setCellValue("Nr. albumu");
            firstRow.createCell(3).setCellValue("Email");
            firstRow.createCell(4).setCellValue("Wydział");
            firstRow.createCell(5).setCellValue("Kierunek");


            int rowIndex = 1;

            List<StudentDTO> studentDTOS = group.getStudents();
            // Sort by surname
//            Collections.sort(studentDTOS, (s1, s2) -> s1.getSurname().compareTo(s2.getSurname()));

            for (StudentDTO studentDTO : studentDTOS) {
                HSSFRow dataRow = sheet.createRow(rowIndex);
                dataRow.createCell(0).setCellValue(studentDTO.getName());
                dataRow.createCell(1).setCellValue(studentDTO.getSurname());
                dataRow.createCell(2).setCellValue(studentDTO.getAlbum());
                dataRow.createCell(3).setCellValue(studentDTO.getEmail());
                dataRow.createCell(4).setCellValue(studentDTO.getFaculty());
                dataRow.createCell(5).setCellValue(studentDTO.getFieldOfStudy());

                rowIndex++;
            }
        }

        ServletOutputStream ops = response.getOutputStream();
        workbook.write(ops);
        workbook.close();
        ops.close();
    }

    public void exportToExcel(List<GroupDTO> groupDTOS) throws Exception{

        HSSFWorkbook workbook = new HSSFWorkbook();

        for (GroupDTO group: groupDTOS) {
            HSSFSheet sheet = workbook.createSheet(group.getTerm().toString());
            HSSFRow firstRow = sheet.createRow(0);

            firstRow.createCell(0).setCellValue("Imię");
            firstRow.createCell(1).setCellValue("Nazwisko");
            firstRow.createCell(2).setCellValue("Nr. albumu");
            firstRow.createCell(3).setCellValue("Email");
            firstRow.createCell(4).setCellValue("Wydział");
            firstRow.createCell(5).setCellValue("Kierunek");


            int rowIndex = 1;

            List<StudentDTO> studentDTOS = group.getStudents();
            // Sort by surname
//            Collections.sort(studentDTOS, (s1, s2) -> s1.getSurname().compareTo(s2.getSurname()));

            for (StudentDTO studentDTO : studentDTOS) {
                HSSFRow dataRow = sheet.createRow(rowIndex);
                dataRow.createCell(0).setCellValue(studentDTO.getName());
                dataRow.createCell(1).setCellValue(studentDTO.getSurname());
                dataRow.createCell(2).setCellValue(studentDTO.getAlbum());
                dataRow.createCell(3).setCellValue(studentDTO.getEmail());
                dataRow.createCell(4).setCellValue(studentDTO.getFaculty());
                dataRow.createCell(5).setCellValue(studentDTO.getFieldOfStudy());

                rowIndex++;
            }
        }

//        ServletOutputStream ops = response.getOutputStream();
//        workbook.write(ops);
//        workbook.close();
//        ops.close();
    }
}
