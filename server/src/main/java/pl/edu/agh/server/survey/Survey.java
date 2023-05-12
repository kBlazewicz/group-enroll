package pl.edu.agh.server.survey;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.codec.binary.Hex;
import org.apache.commons.codec.digest.DigestUtils;
import pl.edu.agh.server.term.Term;

import java.security.SecureRandom;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "surveys")
public class Survey {
    @Id
    String linkCode;

    @OneToMany
    List<Term> termlist;

    public Survey(List<Term> termlist) {
        this.termlist = termlist;
        this.linkCode = generatelinkCode();
    }

    private String generatelinkCode() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[16];
        random.nextBytes(bytes);
        String linkCode = new String(Hex.encodeHex(bytes));
        return DigestUtils.sha256Hex(linkCode);
    }
}
