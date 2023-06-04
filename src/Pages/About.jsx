import React from "react";

export default function About() {
  return (
    <div>
      <h1 className="mb-6">About Me</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet nobis,
        eius vitae veniam fuga cumque officia animi soluta quasi dolores,
        dolorem voluptatum error, reiciendis fugiat magnam placeat ut nihil?
        Dignissimos corporis, illum cum commodi facilis expedita autem quod enim
        veritatis.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
        voluptas fugiat tempore temporibus optio id veritatis nobis sit eligendi
        laboriosam?
      </p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
        tenetur cupiditate, delectus numquam, accusamus temporibus corporis
        voluptate quidem, rem id fugiat assumenda! Modi nostrum laboriosam ipsam
        laborum. Quibusdam, neque eum.
      </p>
      <div className="mt-12 space-x-3">
        <a
          href="#"
          className="color-span p-3 border border-solid rounded-lg decoration-transparent duration-200 hover:bg-accent hover:text-white hover:brightness-100"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}
